import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import React from "react";

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const { userId } = auth();
  const transform = transformationTypes[type];

  if(!userId) redirect('/sign-in')

  const user = await getUserById(userId);
  return (
    <div>
      <Header title={transform.title} description={transform.description} />
      <TransformationForm  
       action="Add"
       userId={user._id}
       type={transform.type as TransformationTypeKey}
       creditBalance={user.creditBalance} />
       
    </div>
  );
};

export default AddTransformationTypePage;
