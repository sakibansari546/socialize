import { useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react'
import AnimationWrapper from '../common/AnimationWrapper';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP } from '../store/userSlice';
import { toast } from 'sonner';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.user);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);


    // State to store the OTP entered by the user
    const [otp, setOtp] = useState(["", "", "", "",]);
    const [focusIndex, setFocusIndex] = useState(null); // Track which input is focused
    const inputRefs = useRef([]);


    const handleChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
        setOtp(newOtp);
    };

    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            inputRefs.current[index - 1].focus();
            setOtp(newOtp);
        }
    };

    // Check if all OTP fields are filled
    useEffect(() => {
        const token = otp.join('');
        const verifyEmailOTP = async () => {
            try {
                setLoading(true);
                const res = await axios.post(`http://localhost:3000/api/user/verify-email`,
                    { token },
                    { withCredentials: true });

                console.log('Response:', res.data); // Add this line to check full response

                if (res.data.success) {
                    dispatch(verifyOTP(res.data.user));
                    toast.success('Logged in successfully');
                    navigate('/');
                } else {
                    setError(res.data.message || "Invalid token");
                }
            } catch (error) {
                console.log(error);
                setError(error.response?.data?.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        if (otp.every((digit) => digit !== "")) {
            console.log("OTP is:", otp.join(''));  // Logs the OTP
            verifyEmailOTP();
        }

    }, [otp]);

    return (
        <AnimationWrapper>
            <div className='bg-[#efefef] w-screen h-screen flex flex-col items-center justify-center px-4'>

                <h2 className='font-mono font-bold text-3xl text-center'>Verify your Email</h2>
                <p className='mt-3 text-lg font-mono text-center'>Enter the 4-degit OTP you have recived on email</p>
                <div className='flex items-center gap-5 my-5'>
                    {
                        otp.map((digit, index) => {
                            return (
                                <div className='relative' key={index}>
                                    <div className='relative z-20'>
                                        <input
                                            className='w-14 h-14 border text-3xl font-semibold text-center outline-none'
                                            type="text"
                                            onFocus={() => setFocusIndex(index)} // Set focus index
                                            onBlur={() => setFocusIndex(null)} // Remove focus index
                                            placeholder='0'
                                            maxLength={1}
                                            value={digit}
                                            autoFocus={index === 0}
                                            ref={(ref) => (inputRefs.current[index] = ref)}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            disabled={loading}
                                        />
                                    </div>

                                    {/* Background div with transition effect */}
                                    <div
                                        className={`absolute ${focusIndex === index ? 'top-0 left-0' : 'top-2 left-2'} z-10 bg-black w-full h-full transition-all duration-300`}
                                    ></div>

                                </div>
                            )
                        })
                    }
                </div>
                {error && <p className='text-red-500 font-semibold text-center w-full my-0 py-0'>{error}</p>}
            </div>
        </AnimationWrapper>
    )
}

export default VerifyEmail;
