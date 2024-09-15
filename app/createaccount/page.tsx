export default function CreateAccount() {
    return(
        <div id="createAccountDiv" className="flex items-center justify-center h-screen bg-gray-200 text-center">
            <div>
                <h1 className="text-4xl font-bold text-sky-800">Create Account</h1>
                <p className="text-xl text-sky-800">Please fill out the form below to create an account</p>
                <div className="p-5">
                    <form>
                        <label className="block text-sky-800 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-sky-800 p-2"
                            id="username"
                            type="text"
                            placeholder="Username"
                        />
                        <label className="block text-sky-800 text-sm font-bold mb-2 p-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-sky-800 p-2"
                            id="email"
                            type="text"
                            placeholder="Email"
                        />
                        <label className="block text-sky-800 text-sm font-bold mb-2 p-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-sky-800 p-2"
                            id="password"
                            type="password"
                            placeholder="Password"
                        />
                        <label className="block text-sky-800 text-sm font-bold mb-2 p-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-sky-800 p-2"
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                        />
                        <button className="bg-sky-800 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded mt-5 p-2">
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
    );

}