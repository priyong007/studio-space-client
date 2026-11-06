
"use client";

import React, { Suspense} from "react";


import LoginForm from "./LoginForm";

export default function LoginPage() {
  

  return (
    <div>
      <Suspense fallback={<div> Loading....</div>}>
        <LoginForm/>
      </Suspense>
    </div>
  );
}
