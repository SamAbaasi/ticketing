import axios from '@/utils/api'

const baseUrl = '/authorization/v1'

const getOptions = (phoneNumber: string) =>
  axios.get(`${baseUrl}/login/options?phone_number=${phoneNumber}`)

const verifyUser = (
  phone_number: string,
  grant_type: string,
  installation_id: string,
  password: string,
  lang: string,
) =>
  axios.post(
    `${baseUrl}/login/token`,
    JSON.stringify({ phone_number, grant_type, installation_id, password }),
    {
      headers: { 'Content-Type': 'application/json', 'Accept-Language': lang },
    },
  )

const sendOtpRequest = (phone_number: string, notification_option: string, lang: string) =>
  axios.post(`${baseUrl}/login/otp`, JSON.stringify({ phone_number, notification_option }), {
    headers: { 'Content-Type': 'application/json', 'Accept-Language': lang },
  })

const getForgetPasswordRedirectUrl = (hint: string, lang: string) => {
  const headers = {
    'Accept-Language': lang,
  }
  return axios.get(`${baseUrl}/login/rest_password?login_hint=${hint}`, { headers })
}

export default {
  getOptions,
  verifyUser,
  sendOtpRequest,
  getForgetPasswordRedirectUrl,
}
