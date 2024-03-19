import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className=" flex flex-col gap-11 h-screen justify-center items-center">
            <h1 className=" text-[72px] font-extrabold">Oops!</h1>
            <p className="text-2xl text-red-400">Sorry, an unexpected error has occurred.</p>
            <p className=" text-xl text-gray-400">
                <i>{error.statusText || error.message}</i>
            </p>

        </div>
    );
}