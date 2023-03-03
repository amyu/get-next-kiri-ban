import * as core from '@actions/core'
import {context, getOctokit} from '@actions/github'

async function run(): Promise<void> {
  try {
    const token = core.getInput('github-token', {required: true})
    const octokit = getOctokit(token)

    let lastNumber: number | undefined
    if (context.issue.number) {
      lastNumber = context.issue.number
    } else {
      const pullRequests = await octokit.request(
        'GET /repos/{owner}/{repo}/pulls',
        {
          owner: context.repo.owner,
          repo: context.repo.repo
        }
      )
      lastNumber = pullRequests.data[0].number
    }
    core.info(`lastNumber: ${lastNumber}`)

    if (!lastNumber) {
      // not found
      core.setOutput('next', undefined)
      return Promise.resolve()
    }

    // 固定で10個先まで見ている すでにキリ番だった時を考慮して1から始めている
    // まぁInputで受け取ってもいいかもしれない
    for (let i = 1; i <= 11; i++) {
      const nextNumber = (lastNumber + i).toString()
      // ゾロ目だっとき
      if (nextNumber.match(/^(\d)\1*$/)) {
        core.setOutput('next', i)
        core.info(`nextNumber: ${nextNumber} ゾロ目`)
        return Promise.resolve()
      }

      // 先頭以外がすべて0のとき
      if (nextNumber.match(/^[1-9]0*$/)) {
        core.setOutput('next', i)
        core.info(`nextNumber: ${nextNumber} 先頭以外がすべて0`)
        return Promise.resolve()
      }
    }

    core.setOutput('next', undefined)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
