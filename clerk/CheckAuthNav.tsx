import { useUser, SignedIn, SignOutButton } from "@clerk/nextjs";
import { useLanguage } from "@/app/assets/languages/LanguagesContext";

export default function CheckAuthNav() {
  const { isSignedIn } = useUser();
  const { translations } = useLanguage();

  return (
    <div>
      {!isSignedIn && <div>{translations.navBar.log}</div>}
      <SignedIn>
        <SignOutButton>{translations.navBar.deco}</SignOutButton>
      </SignedIn>
    </div>
  );
}

// NOTE ADD these for signup form :  <SignedOut>
// <SignInButton />
// <SignUpButton />
// </SignedOut>
// <SignedIn>
/* <UserButton /> */
/* </SignedIn>  */
