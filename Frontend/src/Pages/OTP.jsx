import {
  Box,
  Heading,
  Image,
  Stack,
  Text,
  PinInputField,
  PinInput,
  HStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { validateOtp } from "../Redux/AuthRedux/action";



export function Timer({ handleTimer }) {
  const [count, setCount] = React.useState(59);

  React.useEffect(() => {
    let interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          handleTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const clear = () => {
      clearInterval(interval);
      handleTimer();
    };
    return clear;
  }, []);
  return (
    <Box>
      <Text color={"rgb(166, 153, 153)"} fontWeight={"light"} fontSize={"sm"}>
        resend in {count} s
      </Text>
    </Box>
  );
}

function OTP() {
  const [timer, setTimer] = useState(false);
  const [otpNumber, setOtpNumber] = useState([]);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const handleTimer = () => {
    setTimer(false);
  };
  const handleOTP = (e) => {
    // console.log(e);
    setOtpNumber([...otpNumber, e.target.value]);
    // console.log(otpNumber);
  };

  useEffect(() => {
    toast({
      title: `OTP sent to your mobile number ${localStorage.getItem(
        "phoneNo"
      )}`,
      description: `Otp is ${localStorage.getItem("OTP")}`,
      status: "success",
      duration: 6000,
      isClosable: true,
      position: "top",
    });
  }, []);

  const verify = () => {
    let obj = {
      phoneNo: Number(localStorage.getItem("phoneNo")),
      tempOtp: Number(otpNumber.join("")),
    };

    dispatch(validateOtp(obj)).then((res) => {
      if (res) {
        localStorage.setItem("token", res.token);
        toast({
          title: "Account Created Successfully",
          description: `Welcome to Shop Vibes`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setOtpNumber([]);
        navigate("/");
      } else {
        toast({
          title: "Please Check your OTP",

          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setOtpNumber([]);
      }
    });

    // if (otpNumber.join("") === localStorage.getItem("OTP")) {
    //   toast({
    //     title: "Account Created Successfully",
    //     description: `Welcome to shoperz`,
    //     status: "success",
    //     duration: 3000,
    //     isClosable: true,
    //     position: "top",
    //   });
    //   setOtpNumber([]);
    //   navigate("/");
    // } else {
    //   toast({
    //     title: "Wrong OTP ",
    //     description: `Please enter correct otp to proceed`,
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    //   setOtpNumber([]);
    // }
  };

  return (
    <Box>
      <Navbar />
      <Box bgColor={"rgb(253, 237, 236)"} height={"635px"} p={"50px"}>
        <Box
          w={"431px"}
          border={"1px solid rgb(223, 223, 223)"}
          m={"auto"}
          borderRadius={"5px"}
          bgColor={"white"}
        >
          <Stack>
            <Image
              borderTopRadius={"5px"}
              w={"431px"}
              src="https://images.meesho.com/images/marketing/1661417516766.webp"
            />
          </Stack>
          {/* MObile Number */}
          <Stack mt={"20px"} h={"308px"} p={"20px"}>
            <Heading fontSize={"2xl"}>Enter OTP</Heading>

            {/* <Text
              color={"rgb(166, 153, 153)"}
              fontWeight={"light"}
              fontSize={"sm"}
              cursor={"pointer"}
              onClick={() => ""}
            >
              Reset OTP
            </Text> */}

            <HStack m={"auto"}>
              <PinInput type="number">
                <PinInputField onChange={(e) => handleOTP(e)} />
                <PinInputField onChange={(e) => handleOTP(e)} />
                <PinInputField onChange={(e) => handleOTP(e)} />
                <PinInputField onChange={(e) => handleOTP(e)} />
                <PinInputField onChange={(e) => handleOTP(e)} />
                <PinInputField onChange={(e) => handleOTP(e)} />
              </PinInput>
            </HStack>
            <Button
              textAlign={"center"}
              bgColor="rgb(244, 51, 151)"
              variant="outline"
              color={"white"}
              width={"100%"}
              _hover={{ bg: "rgb(199, 60, 157)" }}
              onClick={verify}
            >
              Verify
            </Button>
            {timer || (
              <Text
                color={"rgb(246, 93, 151)"}
                onClick={() => {
                  toast({
                    title: "OTP sent on your mobile number",
                    description: `Please enter your otp to proceed `,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                    position: "top",
                  });
                  setTimer(!timer);
                }}
                cursor={"pointer"}
                fontWeight={"bold"}
              >
                Resend OTP
              </Text>
            )}
            {timer && <Timer handleTimer={handleTimer} />}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default OTP;
