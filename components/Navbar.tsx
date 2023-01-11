import { useTheme } from "next-themes";
import { MouseEventHandler, useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const themeChange: MouseEventHandler<HTMLInputElement> = (e) => {
    theme === "business" ? setTheme("cmyk") : setTheme("business");
  };

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn("google");
    },
  });

  useEffect(() => {
    if (status === "loading") {
      console.log("loading");
    }
  }, []);
  return (
    <nav className="absolute top-0 inset-x-0 flex justify-between sm:justify-end items-center p-4 gap-x-2">
      <div className="form-control">
        <label className="label cursor-pointer gap-2">
          <span className="label-text text-md font-semibold font-serif hidden sm:block">
            Toggle Dark Mode
          </span>
          <input
            type="checkbox"
            onClick={themeChange}
            className="toggle toggle-lg"
          />
        </label>
      </div>
      <div>
        <button
          className="btn btn-error btn-sm rounded-lg"
          onClick={() => signOut()}
        >
          Signout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
