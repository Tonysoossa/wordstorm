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
        <div>
          <SignInButton mode="modal">{translations.navBar.log}</SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <SignOutButton>{translations.navBar.deco}</SignOutButton>
      </SignedIn>
    </div>
  );
}
