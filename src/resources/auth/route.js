// // controllers
import authController from '~/resources/auth/controller'

// // middlewares
// import authentication from '~/middleware/authentication'

export default ({ router }) => router
  .prefix('/auth')

//   .post(
//     '/',
//     authController.login
//   )

//   .get(
//     '/',
//     authentication(),
//     authController.get
//   )

// export default () => {
//   console.log('asdf')
// }
