import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCustomer, updateCustomer } from "./customerSlice";
import { useNavigate } from "react-router-dom";
import { makeEditTrueFalse } from "./editControllerSlice";
import * as Style from "./CustomerForm.styled";
import { Button, Label, TextInput } from "flowbite-react";

const schema = yup.object().shape({
  PAN: yup
    .string()
    .required("PAN is required")
    .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN format")
    .max(10),
  fullName: yup.string().required("Full Name is required").max(140),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .max(255),
  mobile: yup
    .string()
    .required("Mobile Number is required")
    .matches(/^[0-9]{10}$/, "Invalid mobile number")
    .max(10),
  addresses: yup
    .array()
    .of(
      yup.object().shape({
        addressLine1: yup.string().required("Address Line 1 is required"),
        addressLine2: yup.string(),
        postcode: yup
          .string()
          .required("Postcode is required")
          .matches(/^[0-9]{6}$/, "Invalid postcode format")
          .max(6),
        state: yup.string().required("State is required"),
        city: yup.string().required("City is required"),
      })
    )
    .max(10),
});

const CustomerForm = ({ existingCustomer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const edit = useSelector((state) => state.edit.isEdit);
  console.log(edit);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      PAN: existingCustomer?.PAN || "",
      fullName: existingCustomer?.fullName || "",
      email: existingCustomer?.email || "",
      mobile: existingCustomer?.mobile || "",
      addresses: existingCustomer?.addresses || [
        {
          addressLine1: "",
          addressLine2: "",
          postcode: "",
          state: "",
          city: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const [loadingPAN, setLoadingPAN] = useState(false);
  const [loadingPostcode, setLoadingPostcode] = useState(false);

  const onSubmit = (data) => {
    if (existingCustomer) {
      dispatch(updateCustomer(data));
      dispatch(makeEditTrueFalse(false));

      navigate("/");
    } else {
      dispatch(addCustomer(data));
      dispatch(makeEditTrueFalse(false));
      navigate("/");
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "PAN" && value.PAN.length === 10) {
        setLoadingPAN(true);
        axios
          .post("https://lab.pixel6.co/api/verify-pan.php", {
            panNumber: value.PAN,
          })
          .then((response) => {
            if (response.data.isValid) {
              setValue("fullName", response.data.fullName);
            }
          })
          .catch((error) => console.error(error))
          .finally(() => setLoadingPAN(false));
      }
      if (
        name?.includes("postcode") &&
        value.addresses.some((addr) => addr.postcode.length === 6)
      ) {
        const index = name.split(".")[1];
        const postcode = value.addresses[index].postcode;
        setLoadingPostcode(true);
        axios
          .post("https://lab.pixel6.co/api/get-postcode-details.php", {
            postcode,
          })
          .then((response) => {
            setValue(`addresses.${index}.city`, response.data.city[0].name);
            setValue(`addresses.${index}.state`, response.data.state[0].name);
          })
          .catch((error) => console.error(error))
          .finally(() => setLoadingPostcode(false));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  return (
    <Style.Container>
      <Style.Heading>Customer Details</Style.Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Style.Line>
          <Style.Row>
            <Label value="PAN:" />
            <TextInput
              id="pan"
              type="text"
              placeholder="PAN"
              required
              {...register("PAN")}
            />
            {loadingPAN && <span>Loading...</span>}
            {errors.PAN && <p>{errors.PAN.message}</p>}
          </Style.Row>

          <Style.Row>
            <Label value="NAME:" />
            <TextInput
              id="name"
              type="text"
              placeholder="Full Name"
              required
              {...register("fullName")}
            />
            {errors.fullName && <p>{errors.fullName.message}</p>}
          </Style.Row>

          <Style.Row>
            <Label value="EMAIL:" />
            <TextInput
              id="email3"
              type="email"
              placeholder="name@xyz.com"
              required
              {...register("email")}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </Style.Row>

          <Style.Row>
            <Label value="MOBILE:" />
            <TextInput
              id="contact"
              type="number"
              placeholder="XXXXXXXXXX"
              addon="+91"
              required
              {...register("mobile")}
            />
            {errors.mobile && <p>{errors.mobile.message}</p>}
          </Style.Row>
        </Style.Line>

        {fields.map((field, index) => (
          <div key={field.id}>
            <Style.Text1>Address {index + 1}:</Style.Text1>
            <Style.Line>
              <Style.Row>
                <Label value="ADDRESS LINE 1:" />
                <TextInput
                  id="address1"
                  type="text"
                  placeholder="Area/Street/Colony"
                  required
                  {...register(`addresses.${index}.addressLine1`)}
                />
                {errors.addresses?.[index]?.addressLine1 && (
                  <p>{errors.addresses[index].addressLine1.message}</p>
                )}
              </Style.Row>

              <Style.Row>
                <Label value="ADDRESS LINE 2:" />
                <TextInput
                  id="address2"
                  type="text"
                  placeholder="Area/Street/Colony"
                  {...register(`addresses.${index}.addressLine2`)}
                />
              </Style.Row>

              <Style.Row>
                <Label value="POSTCODE:" />
                <TextInput
                  id="postcode"
                  type="number"
                  placeholder="XXXXXX"
                  required
                  {...register(`addresses.${index}.postcode`)}
                />
                {loadingPostcode && <span>Loading...</span>}
                {errors.addresses?.[index]?.postcode && (
                  <p>{errors.addresses[index].postcode.message}</p>
                )}
              </Style.Row>

              <Style.Row>
                <Label value="CITY:" />
                <TextInput
                  id="city"
                  type="text"
                  placeholder="City"
                  {...register(`addresses.${index}.city`)}
                />
                {errors.addresses?.[index]?.city && (
                  <p>{errors.addresses[index].city.message}</p>
                )}
              </Style.Row>

              <Style.Row>
                <Label value="STATE:" />
                <TextInput
                  id="state"
                  type="text"
                  placeholder="State"
                  {...register(`addresses.${index}.state`)}
                />
                {errors.addresses?.[index]?.state && (
                  <p>{errors.addresses[index].state.message}</p>
                )}
              </Style.Row>

              <Style.Buttons>
                <Button
                  type="button"
                  color="dark"
                  onClick={() => remove(index)}
                >
                  Remove Address
                </Button>
              </Style.Buttons>
            </Style.Line>
          </div>
        ))}
        <Style.Buttons>
          <Button
            type="button"
            color="blue"
            onClick={() =>
              append({
                addressLine1: "",
                addressLine2: "",
                postcode: "",
                state: "",
                city: "",
              })
            }
          >
            Add Address
          </Button>
        </Style.Buttons>

        <Style.Buttons>
          <Button type="submit" color="blue">
            Submit
          </Button>
        </Style.Buttons>
      </form>
    </Style.Container>
  );
};

export default CustomerForm;
