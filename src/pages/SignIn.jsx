import {GoogleButton} from 'react-google-button'
import {useState} from 'react'
import {signInWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail} from 'firebase/auth'
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {userSignOut} from '../firebase/libs/auth'

/**
 * Function that signs the user in with the email and password provided
 * @param {Event} e
 * @returns {Promise<void>}
 */
export const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = getAuth()
  const navigate = useNavigate()
  const provider = new GoogleAuthProvider()

  /**
   *  Function that signs the user in with the email and password provided
   *  @param {Event} e
   *  @returns {Promise<void>}
   **/
  const userSignIn = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/admin')
      })
      .catch((error) => {
        console.error('error occurred logging in:', error)
        alert('Invalid Email or Password')
      })
  }

  /**
   * Function that signs the user in with Google
   * @returns {Promise<void>}
   * **/
  const userSignInGoogle = async () => {
    return signInWithPopup(auth, provider)
      .then(() => {
        navigate('/admin')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMsg = error.message
        alert('Invalid Email or Not Authenticated')
        console.error(errorCode, errorMsg)
      })
  }

  /**
   * Function that listens for changes in the user's sign-in state
   * @param {auth} auth
   * @param {function} (user) => {}
   * @returns {void}
   * **/
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(`signed in as ${user.email}`)
    } else {
      console.log('signed out')
    }
  })

  /**
   * Sends a password reset email to the user with the given email address.
   *
   * @param {string} email
   * @returns {Promise<void>}
   **/
  function handlePasswordReset() {
    const email = prompt('Please enter your email')
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      alert('Invalid email format. Please enter a valid email address.')
      return
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Email Sent! Check your Inbox.')
      })
      .catch((error) => {
        alert('Error sending email: ' + error.message)
      })
  }

  return (
    <div className="mt-2 flex h-screen w-full flex-col items-center bg-slate-800 bg-topography dark:text-neutral-200">
      <div className={'z-20 mt-28 w-screen cursor-pointer p-2 sm:w-80 md:w-96'}>
        <div
          className={
            ' flex flex-col items-center justify-center rounded-xl bg-slate-100/40 py-8 shadow-2xl backdrop-blur-lg dark:bg-neutral-400/80 dark:backdrop-blur-lg'
          }
        >
          <h1 className="font-inter mb-4 rounded-xl bg-blue-500 px-3 py-1 text-center text-lg font-thin uppercase text-slate-200 shadow-lg">
            Admin
          </h1>
          <form onSubmit={userSignIn} className="w-full px-4">
            <div className={'flex w-full flex-col gap-3'}>
              <div className="flex w-full flex-col">
                <label htmlFor="email" className="font-light ">
                  Email Address
                </label>
                <input
                  className="h-10 w-full rounded border-slate-200 bg-slate-700 p-2 shadow"
                  id="useremail"
                  type="email"
                  placeholder="John@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="email" className="font-light">
                  Password
                </label>
                <input
                  className="h-10 rounded border-slate-300 bg-slate-700 p-2 align-baseline shadow"
                  id="userpassword"
                  type="password"
                  placeholder="**********"
                  autoComplete={'on'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="flex w-full flex-col">
              <button
                className="mt-4 w-full rounded-lg bg-neutral-800 py-1 text-lg font-light text-neutral-300"
                id="submitbtn"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className={'mt-4 flex flex-col items-center'}>
            <GoogleButton
              id="gbutton"
              onClick={() => {
                userSignInGoogle()
              }}
            />
            <p onClick={handlePasswordReset} className="forgot-password mt-4 cursor-pointer">
              Forgot Password?
            </p>

            <button
              id="signout"
              onClick={() => {
                userSignOut()
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignIn
