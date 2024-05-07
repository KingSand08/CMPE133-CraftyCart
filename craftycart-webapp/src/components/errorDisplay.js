export default function ErrorDisplay ({message}) {
    return (<div className="flex justify-center align-middle bg-red-400 rounded-xl p-5 mt-5">
        <div className="font-bold text-lg  ">
            {message}
        </div>
    </div>);
}