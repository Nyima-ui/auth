import Link from "next/link";

const page = () => {
  return (
    <div className="p-5">
      <nav>
        <Link href="/">LOGO</Link>
      </nav>
      <h1 className="text-5xl mt-10">This is dashboard</h1>
      <p className="mt-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil magni,
        aspernatur aliquam facilis omnis sit eos rem assumenda excepturi dicta
        explicabo sed quia tempore optio voluptate, inventore id. Vero, libero
        optio accusantium neque quae necessitatibus quibusdam! Doloribus
        laboriosam vel placeat eos minus quo nihil vitae et! Accusamus animi
        quidem consectetur.
      </p>

      <p className="mt-7 text-red-300">
        Contains important stats and charts about a particular user.
      </p>
      <p>Page must be protected.</p>
    </div>
  );
};

export default page;
