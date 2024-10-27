import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="w-full flax items-center justify-center">
      <main className=" text-center w-full min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-2xl font-semibold text-accent">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-white/30">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={-1}
              className="rounded-md bg-accent-hover px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:border hover:border-accent hover:bg-primary hover:text-accent "
            >
              Go Back 
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
