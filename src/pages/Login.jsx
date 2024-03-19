/* eslint-disable react/prop-types */
import { useState } from "react"
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faDiscord } from "@fortawesome/free-brands-svg-icons"
import supabase from "@/config/supabaseClient"
import { Link } from "react-router-dom"
import LoadingSpinner from "@/components/ui/loading"
import AuthProvider from "@/components/AuthProvider"


const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export default function Login() {
    const [error, setError] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

    const onSubmit = async (datas) => {
        setIsLoading(true)
        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email: datas.email,
                password: datas.password,
            });

            if (authError) {
                setIsError(true)
                if (authError.message === 'Invalid login credentials') {
                    setError('Invalid login details');
                } else {
                    setError('An unexpected error occurred');
                }
                console.error(authError);
            } else if (data) {
                setIsError(false)
                console.log(data)
                navigate('/');
                return <AuthProvider isSignedIn={true} />
            }
        } catch (err) {
            setIsError(true);
            setError('An unexpected error occurred');
            console.error(err);
        }
        setIsLoading(false)
    };

    async function signInGoogle() {
        const { user, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
        if (error) {
            console.log(error)
            setError('An unexpected error occurred');
        }
        if (user) {
            console.log(user)
            navigate("/")
        }
    }

    async function signInDiscord() {
        const { user, error } = await supabase.auth.signInWithOAuth({
            provider: "discord",
        })
        if (error) {
            console.log(error)
            setError('An unexpected error occurred');

        }
        if (user) {
            console.log(user)
            navigate("/")
        }
    }

    return (<>{isLoading ? <LoadingSpinner /> : <div className=" p-5 flex flex-col gap-14">
        <div className=" flex justify-end">
            <Link to="/signup">
                <Button>
                    <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Sign Up with Email
                </Button>
            </Link>
        </div>
        <div className=" flex flex-col gap-5 justify-center items-center h-96">
            <div className=" text-2xl flex flex-col gap-5 text-center">
                <h1 className=" text-3xl font-bold">Sign in</h1>
                <p className=" text-gray-400 text-sm">Please sign in to your account</p>
                <form action="" onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-2" >
                    <div>
                        <div className=" w-96 text-left">
                            <Label>Email</Label>
                            <Input
                                {...register("email")}
                                type="text"
                                placeholder="abc@example.com"
                            />
                            {errors.email && <span className=" text-red-500 text-xs">Please enter a valid email</span>}
                        </div>
                    </div>
                    <div className=" mb-3">
                        <div className=" text-left">
                            <Label>Password</Label>
                            <Input
                                {...register("password")}
                                type="password"
                                placeholder="Password"
                            />
                            {errors.password && <span className=" text-red-500 text-xs">Password must be at least 8 characters</span>}
                        </div>
                    </div>
                    <div>
                        <button type="submit" className=" w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Sign in</button>
                    </div>
                    {isError && <div className=" text-red-500 text-xs">{error}</div>}
                </form>
                <p className="text-gray-400 text-[12px]">OR CONTINUE WITH</p>
                <div className=" w-full">
                    <Button onClick={() => { signInGoogle() }} className="w-full">
                        <FontAwesomeIcon icon={faGoogle} />&nbsp;&nbsp;Google
                    </Button>
                </div>
                <div className=" w-full">
                    <Button onClick={() => { signInDiscord() }} className="w-full">
                        <FontAwesomeIcon icon={faDiscord} />&nbsp;&nbsp;Discord
                    </Button>
                </div>

            </div>


        </div>
    </div >}</>

    )
}
