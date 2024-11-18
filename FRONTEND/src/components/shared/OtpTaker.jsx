"use client";

import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "~/components/ui/input-otp";

export function OtpTaker({ value, onChange, error }) {
  return (
    <div className="">
      <InputOTP maxLength={4} value={value} onChange={onChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} error={error} />
          <InputOTPSlot index={1} error={error} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} error={error} />
          <InputOTPSlot index={3} error={error} />
        </InputOTPGroup>
      </InputOTP>
      {/* <div className="text-center text-sm">
        {value === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>
            You entered:
            {value}
          </>
        )}
      </div> */}
    </div>
  );
}
