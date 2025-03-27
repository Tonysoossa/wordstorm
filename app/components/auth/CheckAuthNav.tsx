import {
  SignedIn,
  SignedOut,
  SignOutButton,
  SignInButton,
} from "@clerk/nextjs";
import { useLanguage } from "@/app/assets/languages/LanguagesContext";

export default function CheckAuthNav() {
  const { translations } = useLanguage();

  return (
    <div>
      <SignedOut>
        <div className="cursor-pointer hover:text-yellowCustom hover:scale-110">
          <SignInButton mode="modal">{translations.navBar.log}</SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="cursor-pointer hover:text-yellowCustom hover:scale-110">
          <SignOutButton>{translations.navBar.deco}</SignOutButton>
        </div>
      </SignedIn>
    </div>
  );
}
