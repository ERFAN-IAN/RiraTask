# [Demo](https://ea-rira-task.vercel.app/)

# Important

### The task is connected to a mongo database and needs an ENV file to run. Use the [Demo](https://ea-rira-task.vercel.app/) instead of running it localy.

- Server actions are used for api calls. Traditional REST api was also an option but I opted for this approach as it's faster to implement.
- All of the task requirements are implemented.
- There are three useEffects throughout the project. One is for the UI library, the other two are purely there to solve the ssr related hydration issue caused by the utilization of date logic on deployment.
- This task uses shadcn as it's UI library and Nextjs as it's react flavor of choice.
- zod validates the data.
- Dark/light theme, skeleton loading and a table view are added to the task.
- Card grid view supports drag and drop of cards on desktop. The table view doesn't offer this feature.
