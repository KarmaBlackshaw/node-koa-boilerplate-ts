import bulkImport from '~/utilities/bulkImport'

export default async () => {
  const jobs = await bulkImport('src/jobs/*.ts')

  jobs.forEach(job => {
    job()
  })
}
