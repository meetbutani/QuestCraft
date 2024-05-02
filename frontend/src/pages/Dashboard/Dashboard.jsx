import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import CardDataStats from "../../components/CardDataStats";
import { IoNewspaper } from "react-icons/io5";
import { HiMiniDocumentDuplicate } from "react-icons/hi2";
import { CgFileDocument } from "react-icons/cg";
import { FaRegListAlt, FaBook } from "react-icons/fa";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";

const Dashboard = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dashboard" />
      <div className="grid grid-rows-4 gap-4 md:grid-cols-2 md:gap-6 xl:grid-rows-2 2xl:gap-7.5">
        <CardDataStats
          total={23}
          title={"Total Question Papers"}
          icon={CgFileDocument}
          navigateTo={"/qpaper/manage-paper"}
        />
        <CardDataStats
          total={34}
          title={"Total Subjects"}
          icon={FaBook}
          navigateTo={"/subject/manage-subject"}
        />
        <CardDataStats
          total={114}
          title={"Total Units"}
          icon={HiMiniDocumentDuplicate}
          navigateTo={"/subject/manage-subject"}
        />
        <CardDataStats
          total={256}
          title={"Total Questions"}
          icon={FaRegListAlt}
          navigateTo={"/subject/manage-subject"}
        />
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
