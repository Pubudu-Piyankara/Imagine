import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import React from "react";

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const transform = transformationTypes[type];
  const { userId } = auth();
  if(!userId) return null;
  const user = await getUserById(userId);

  return (
    <div>
      <Header title={transform.title} description={transform.description} />
      <TransformationForm  
       action="Add"
       userId={user._Id}
       type={transform.type as TransformationTypeKey}
       creditBalance={user.creditBalance} />
    </div>
  );
};

export default AddTransformationTypePage;
