import api from './api'
import fake from './fake'

const useFake = false

export default {
  verifyUser: useFake ? fake.verifyUser : api.verifyUser,
  getOptions: api.getOptions,
  sendOtpRequest: useFake ? fake.sendOtpRequest : api.sendOtpRequest,
  getForgetPasswordRedirectUrl: useFake
    ? fake.getForgetPasswordRedirectUrl
    : api.getForgetPasswordRedirectUrl,
}
