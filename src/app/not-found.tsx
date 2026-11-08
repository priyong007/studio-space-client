import Link from 'next/link';


const NotFoundPage = () => {
    return (
        <div>
           <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        404 error
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base text-muted">
        Sorry, we couldn’t find the page you’re looking for. It might have been
        removed or the link might be broken.
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Link href={'/'}>
        <button className='btn text-red-600'>Return Home</button>
        </Link>
        
      </div>
    </main>
        </div>
    );
};

export default NotFoundPage;