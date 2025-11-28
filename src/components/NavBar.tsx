import { useToggle } from 'usehooks-ts'
export const NavBar = () => {
  const [dropdownOpen, toggleDropdown, setState] = useToggle()
  const closeDropdown = () => setState(false)
  return (
    <nav className="bg-base-100 sticky w-full z-20 top-0 left-0 border-b border-base-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-base-content">
            Rössing
          </span>
        </a>
        <div className="flex md:order-2">
          <a
            href="/about"
            className="button flex text-primary-content bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/30 font-medium rounded-lg px-4 py-2 text-center mr-3 md:mr-0"
          >
            Mitmachen
          </a>
          <button
            onClick={toggleDropdown}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-base-content/60 rounded-lg md:hidden hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-base-300"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`md:hidden items-center justify-between w-full md:flex md:w-auto transition-all md:order-1 transform  ${
            dropdownOpen ? '' : 'hidden'
          }`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-base-300 rounded-lg bg-base-200 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-base-100">
            <li>
              <a
                href="/events"
                onClick={closeDropdown}
                className="block py-2 pl-3 pr-4 text-primary-content bg-primary rounded md:bg-transparent md:text-primary md:p-0"
                aria-current="page"
              >
                Veranstaltungen
              </a>
            </li>
          </ul>
        </div>
        {/** biome-ignore lint/correctness/useUniqueElementIds: I do not know if this really is an issue... */}
        <div
          className={`items-center justify-between hidden md:block`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-base-300 rounded-lg bg-base-200 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-base-100">
            <li>
              <a
                href="/events"
                className="block py-2 pl-3 pr-4 text-primary-content bg-primary rounded md:bg-transparent md:text-primary md:p-0"
                aria-current="page"
              >
                Veranstaltungen
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
