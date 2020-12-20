import React from "react";

import Account from "../components/account";

function AccountPage(props) {
    console.log(props + "HERE")
  return (
    <main>
      <Account {...props} />
    </main>
  );
}

export default AccountPage;

