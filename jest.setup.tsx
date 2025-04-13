import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  })),
  usePathname: jest.fn(() => "/mock-path"), // Provide a default mock pathname
  useSearchParams: jest.fn(() => new URLSearchParams()), // Provide mock search params
  // Mock other exports from next/navigation if needed
}));

jest.mock("next/link", () => {
  const MockLink: React.FC<{ children: React.ReactNode; href: string }> = ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));
