export default function HomePageComponent() {

    return (
        <div className="flex flex-col items-center justify-center text-center h-screen w-screen bg-slate-300">
            <div className="bg-white rounded-xl p-12 flex flex-col w-96 text-black shadow-lg">
                <h1 className="text-4xl font-bold text-sky-800">Home Page</h1>
                <p className="text-xl text-sky-800">You have been authenticated.</p>
            </div>
        </div>
    )

}