import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import CardDataStats from "../../components/CardDataStats";
import { IoNewspaper } from "react-icons/io5";
import { HiMiniDocumentDuplicate } from "react-icons/hi2";
import { CgFileDocument } from "react-icons/cg";
import { FaRegListAlt, FaBook } from "react-icons/fa";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import { toast } from "react-toastify";
import axios from "axios";
import { nodeBaseUrl } from "../../js/api.constatnt";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    userCount: 0,
    roleCount: 0,
    subjectCount: 0,
    unitCount: 0,
    paperCount: 0,
    questionCount: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(nodeBaseUrl + "/api/count"); // Update the API endpoint
        if (response.status === 200) {
          setCounts(response.data); // Assuming response.data contains counts directly
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching counts:", error);
        toast.error("Error fetching counts: " + error.message);
      }
    };

    fetchCounts();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dashboard" />
      <div className="grid grid-rows-4 gap-4 md:grid-cols-2 md:gap-6 xl:grid-rows-2 2xl:gap-7.5">
        <CardDataStats
          total={counts.userCount.toString()}
          title={"Total Users"}
          icon={CgFileDocument}
          navigateTo={"/user/manage-users"}
        />
        <CardDataStats
          total={counts.roleCount.toString()}
          title={"Total Roles"}
          icon={CgFileDocument}
          navigateTo={"/role/manage-role"}
        />
        <CardDataStats
          total={counts.subjectCount.toString()}
          title={"Total Subjects"}
          icon={FaBook}
          navigateTo={"/subject/manage-subject"}
        />
        <CardDataStats
          total={counts.unitCount.toString()}
          title={"Total Units"}
          icon={HiMiniDocumentDuplicate}
          navigateTo={"/unit/manage-unit"}
        />
        <CardDataStats
          total={counts.questionCount.toString()}
          title={"Total Questions"}
          icon={FaRegListAlt}
          navigateTo={"/question/manage-question"}
        />
        <CardDataStats
          total={counts.paperCount.toString()}
          title={"Total Question Papers"}
          icon={CgFileDocument}
          navigateTo={"/qpaper/manage-paper"}
        />
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
