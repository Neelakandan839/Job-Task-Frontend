export const server = "https://jobs-task-i.herokuapp.com";

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  Resumeupload: `${server}/upload/resume`,
  jobs: `${server}/api/jobs`,
  applications: `${server}/api/applications`,
  user: `${server}/api/user`,
  candidate: `${server}/api/applicants`,
};

export default apiList;