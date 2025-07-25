export type GetForgetPasswordRedirectUrlResType = {
  data: {
    reset_url: string
  }
}

export type VerifyUserResType = {
  data: { access_token: string }
  status: number
}

export type SendOtpRequestResType = {
  data: {
    status: string
  }
  status: number
}
