const childProcess = require("child_process");



function exec(command, options) {
  console.log("command:", command)
  return new Promise((resolve, reject) => {
    let result = {};
    const cp = childProcess.exec(command, options, (err, stdout, stderr) => {
      if (err) {
        err.stdout = stdout;
        err.stderr = stderr;
        reject(err);
        return;
      }

      result.stdout = stdout;
      result.stderr = stderr;
      if ('code' in result) {
        resolve(result);
      }
    });

    cp.on('exit', (code, signal) => {
      result.code = code;
      result.signal = signal;
      if ('stdout' in result) {
        resolve(result);
      }
    });
  });
}
/**
 * @param {string} tag
 * @param {{ forceGitTag: boolean; signGitTag: boolean; }} gitOpts
 */
function gitTag(tag, { forceGitTag = false, signGitTag = false } = options) {
  let command = `git tag ${tag} -m ${tag} `;

  if (forceGitTag) {
    command = command + "--force ";
  }

  if (signGitTag) {
    command = command + "--sign ";
  }

  return exec(command);
}


/**
 * @param {string} message
 * @param {{ amend: boolean; commitHooks: boolean; signGitCommit: boolean; }} gitOpts
 */
function gitCommit(message, { amend = false, commitHooks = true, signGitCommit = false } = options) {
  let command = "git commit -a ";

  if (!commitHooks) {
    command = command + "--no-verify ";
  }

  if (signGitCommit) {
    command = command + "--gpg-sign ";
  }

  if (amend) {
    command = command + "--amend --no-edit ";
  } else {
    command = command + `-m ${message}`;
  }

  return exec(command);
}

function getCurrentBranch() {
  const branch = childProcess.execSync("git rev-parse --abbrev-ref HEAD");
  return branch;
}

function gitPush(remote, branch) {

  return exec(`git push --follow-tags --no-verify --atomic ${remote} ${branch} `).catch((err) => {
    console.warn("gitPush", err.stderr);
    if (/atomic/.test(err.stderr)) {
      console.log("gitPush", " --atomic failed, attempting non-atomic push");
      return exec(`git push --follow-tags --no-verify ${remote} ${branch} `);
    }
  })
}
module.exports = {
  gitTag,
  gitCommit,
  gitPush,
  getCurrentBranch
}

