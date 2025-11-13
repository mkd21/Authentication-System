

export default function resetOTPForm({inputArr , inputRef , handleChange , handleKeyUp })
{
    return (
        <>
            <div className=" w-full max-w-md p-8 rounded-lg shadow-lg">

                    <h2 className="text-3xl font-extrabold text-[rgb(0,24,155)] mb-6 text-center">
                        Enter Reset OTP
                    </h2>

                    <form className="flex justify-center space-x-4 p-6 rounded-md " >
                        {inputArr.map((value, index) => (
                            <input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            value={value}
                            maxLength={1}
                            ref={(e) => (inputRef.current[index] = e)}
                            onChange={(e) => handleChange(e, index)}
                            onKeyUp={(e) => handleKeyUp(e, index)}
                            className="w-14 h-14 text-2xl font-semibold text-center  rounded-md bg-white shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                            />
                        ))}
                    </form>
            </div>
        </>
    )
}