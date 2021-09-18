const path = require("path");
const fs = require('fs').promises;
const { writeFileSync } = require("fs");
const semver = require('semver');
const assert = require('assert');
const { prompt } = require('enquirer');
const { gitCommit, gitTag, gitPush, getCurrentBranch } = require("./git-commands")

const pkgPath = path.join(process.cwd(), "./package.json");
const pkg = require(pkgPath);
const lastVersion = pkg.version;
let isSuccess = false

const RELEASE_TYPES = ['patch', 'minor', 'major'];
const PRERELEASE_TYPES = ['prepatch', 'preminor', 'premajor'];
const CUSTOM_TYPE_TIP = 'Other, please specify...';

function getNextVersionChoices() {
    const version = semver.valid(lastVersion);
    const versionChoices = []
    const SemverObj = semver.parse(version);
    RELEASE_TYPES.forEach((type) => {
        const nextversion = semver.inc(version, type)
        versionChoices.push({
            message: `${type}(${nextversion})`,
            name: nextversion
        })
    })
    const isPrerelease = (SemverObj.prerelease || []).length > 0;
    if (isPrerelease) {
        const nextversion = semver.inc(version, 'prerelease')
        versionChoices.push({
            message: `prerelease(${nextversion})`,
            name: nextversion
        })
    } else {
        PRERELEASE_TYPES.forEach((type) => {
            const nextversion = semver.inc(version, type, "alpha")
            versionChoices.push({
                message: `${type}(${nextversion})`,
                name: nextversion
            })
        })
    }
    versionChoices.push({
        message: CUSTOM_TYPE_TIP,
        name: CUSTOM_TYPE_TIP
    });
    return versionChoices;
}

function validateInput(input) {
    if ((input && !semver.valid(input)) || !input) {
        console.log('\nversion should be a valid semver value');
        return false;
    }
    if (input && semver.lte(input, lastVersion)) {
        console.log('\nversion must be greater than the current version');
        return false;
    }
    return true;
}

async function updateVersion() {
    const versionChoices = getNextVersionChoices();
    let nextVersion;
    let answer = await prompt({
        type: 'select',
        name: 'value',
        message: 'Select increment (next version):',
        choices: versionChoices,
    });
    if (answer.value === CUSTOM_TYPE_TIP) {
        let answer = await prompt({
            type: 'input',
            name: 'customVersion',
            message: 'Please enter a valid version:',
            validate: validateInput.bind(this),
        });
        nextVersion = answer.customVersion;
    } else {
        nextVersion = answer.value;
    }
    return nextVersion;
}

async function publish() {
    try {
        assert(
            semver.valid(lastVersion),
            'the version must follow the semver standard',
        );
        console.log(`latest version: ${lastVersion}`);
        const nextVersion = await updateVersion();
        pkg.version = nextVersion;
        await fs.writeFile(pkgPath, JSON.stringify(pkg, undefined, 4));
        await commitAndTagUpdates();
        await gitPushToRemote();
        isSuccess = true;
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}
function onProcessExit() {
    process.on('exit', (code) => { // 监听器函数必须只执行同步的操作
        console.log("onProcessExit")
        if (!isSuccess) {
            pkg.version = lastVersion;
            writeFileSync(
                pkgPath,
                JSON.stringify(pkg, undefined, 4)
            );
        }
    });
}
//自动提交并打Tag
function commitAndTagUpdates() {
    console.log("\ngit", "Commit and updates tag...");
    const tagVersionPrefix = "v";
    const version = pkg.version;
    const tag = `${tagVersionPrefix}${version}`;
    const message = tag;

    return gitCommit(message, {})
        .then(() => gitTag(tag, {}))
        .then(() => [tag]);
}
//推送到远程仓库
function gitPushToRemote() {
    console.log("\ngit", "Pushing tags...");
    const gitRemote = "origin";
    const currentBranch = getCurrentBranch();
    return gitPush(gitRemote, currentBranch.toString())
}

onProcessExit();
publish();
