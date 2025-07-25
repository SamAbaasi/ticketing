import { AsyncType, CentralizedError } from 'controller/types/interfaces'
import {
  GetForgetPasswordRedirectUrlResType,
  SendOtpRequestResType,
  VerifyUserResType,
} from './types'

const withError = true

const getForgetPasswordRedirectUrl = async (): Promise<
  AsyncType & GetForgetPasswordRedirectUrlResType
> => {
  if (!withError) {
    return {
      data: {
        reset_url:
          'https://apilogin.irancell.ir/api/password/reset/KvAfIFWdLk1K0O9FDMDja4nxAGeXSp93EyLeJXKMMrxguzWVWYJrtb29G3R2Fwkw%2BXknUrpjOswQR1wm%2B586AWdNMBmxm0EiUwtrRjNrcthbYgD%2B8EkLOd6tkm18A9XwcFJB2riW65ULgA/yd/qy%2BA%3D%3D',
      },
    }
  }
  // TODO: add errors, and make them hash map
  const error: CentralizedError = new Error('')
  error.response = {
    data: {
      type: 'https://my.irancell.ir/errors/internal/card/source/NotFound',
      title: 'Third Party Connection Timeout',
    },
    status: 400,
  }
  throw error
}

const verifyUser = async (): Promise<AsyncType & VerifyUserResType> => {
  if (!withError) {
    return {
      data: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5NDExNzg5MDgwIiwianRpIjoiNTM3NjlhNDYtMDA3YS00NTA5LWFkMDgtN2JhYWRmM2UyZjgzIiwiaWF0IjoxNzQzOTM5MDQ3LCJleHAiOjE3NDM5NDI2NDcsInJvbGUiOiJwcm9maWxlX21hbmFnZXIiLCJzdWJzY3JpYmVyX2NvZGUiOjIwNDM2MzMsInBob25lX251bWJlciI6Ijk0MTE3ODkwODAiLCJpbnN0YWxsYXRpb25faWQiOiIyOTZmZTExZi0zODMzLTQxMDItODZmNS02Y2U0OGRiNGE2MTciLCJhY2NvdW50X2xpbmtfY29kZSI6ODE1MDk4ODEyMCwiZW1haWwiOiJtaWxhZC5mb0BtdG5pcmFuY2VsbC5pciJ9.0zk-P22DUHAsZ7kD1sQbw8mFJn9Po9VjOBBPBikjH0k',
      },
      status: 200,
    }
  }
  // TODO: add errors, and make them hash map
  const error: CentralizedError = new Error('')

  // OTP error
  // error.response = {
  //   data: {
  //     "type": "https://mybusiness.irancell.ir/errors/login/credentials/Invalid_otp",
  //     "title": "Invalid OTP and phone number combination",
  //     "detail": "9337129826 or the OTP used for it is invalid",
  //     "params": {
  //         "phone_number": "9337129826"
  //     }
  //   },
  //   status: 400,
  // };

  // CAS error: static password
  error.response = {
    data: {
      type: 'https://mybusiness.irancell.ir/errors/login/credentials/faild_login',
      title: 'wrong password',
      detail: 'wrong password',
      params: {
        message: 'wrong password',
      },
    },
    status: 400,
  }
  throw error
}

const sendOtpRequest = async (): Promise<AsyncType & SendOtpRequestResType> => {
  if (withError) {
    return {
      data: {
        status: 'done',
      },
      status: 200,
    }
  }
  // TODO: add errors, and make them hash map
  const error: CentralizedError = new Error('')
  error.response = {
    data: {
      type: 'https://my.irancell.ir/errors/login/otp_request/too_many',
      title: 'Too many OTP attempts in time window',
      detail: 'You can only request for OTP once in 600 seconds. You can try in 92 seconds',
      params: {
        phone_number: '989352001337',
        barred_for: '92',
      },
    },
    status: 400,
  }
  throw error
}

// TODO: add fake api of remained apis

export default {
  getForgetPasswordRedirectUrl,
  verifyUser,
  sendOtpRequest,
}
