import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
	HiOutlineLogout
} from 'react-icons/hi'

import {
	FaArrowDown,
	FaArrowUp,
	FaRegBuilding
} from 'react-icons/fa'

import { RiGraduationCapFill } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa6";
import { IoMdAdd,IoIosSettings,IoMdPerson } from "react-icons/io";
import { IoDocumentOutline,IoKeyOutline } from "react-icons/io5";

export const DASHBOARD_LINK = [
	{
		key: 'dashboard',
		label: 'Dashbaord',
		path: '/layout/dashboard',
		icon: <HiOutlineViewGrid />
	},
	
]


export const DASHBOARD_SIDEBAR_LINKS_1 = [
	{
		key: 'courses',
		label: 'Courses',
		path: '/layout/courses',
		icon: <RiGraduationCapFill />
	},

	{
		key: 'subject',
		label: 'Subject',
		path: '/layout/subject',
		icon: <FaBookOpen />,
		iconClosed: <FaArrowDown/>,
		iconOpened: <FaArrowUp/>,
		subNav: [
			{
				label: 'Add Subject',
				path: '/layout/addsubject',
				icon: <IoMdAdd />,
			},
			{
				label: 'Dashboard',
				path: '/layout/addsubjectunit',
				icon: <IoMdAdd />,
			},
			{
				label: 'Manage Subjects',
				path: '/layout/managesubjects',
				icon: <IoIosSettings />,
			}
			


		],
	},
	{
		key: 'question',
		label: 'Question',
		path: '/layout/question',
		icon: <IoDocumentOutline />,
		iconClosed: <FaArrowDown/>,
		iconOpened: <FaArrowUp/>,
		subNav: [
			{
				label: 'Set Questions',
				path: '/layout/setquestion',
				icon: <IoMdAdd />,
			},
			{
				label: 'Manage Questions',
				path: '/layout/managequestion',
				icon: <IoIosSettings />,
			},
			
		],
	},
	{
		key: 'questionpapergenerator',
		label: 'Question Paper Generator',
		path: '/layout/qpg',
		icon: <HiOutlineViewGrid />,
		iconClosed: <FaArrowDown/>,
		iconOpened: <FaArrowUp/>,
		subNav: [
			{
				label: 'Set Subject Paper',
				path: '/layout/setsubjectpaper',
				icon: <IoMdAdd />,
			},
			{
				label: 'Set Unit Paper',
				path: '/layout/setunitpaper',
				icon: <IoMdAdd />,
			},
			{
				label: 'Manage paper',
				path: '/layout/managepaper',
				icon: <IoIosSettings />,
			}
			


		],
	},
	
	
]

export const DASHBOARD_SIDEBAR_SETTINGS_LINKS = [
	{
		key: 'profile',
		label: 'Profile',
		path: '/profile',
		icon: <IoMdPerson />
	},
	{
		key: 'institutioninfo',
		label: 'Institution Info',
		path: '/institutioninfo',
		icon: <FaRegBuilding />
	},
	{
		key: 'users',
		label: 'Users',
		path: '/layout/users',
		icon: <IoMdPerson />,
		iconClosed: <FaArrowDown/>,
		iconOpened: <FaArrowUp/>,
		subNav: [
			{
				label: 'Add Users',
				path: '/layout/addusers',
				icon: <IoMdAdd />,
			},
			{
				label: 'Manage Users',
				path: '/layout/manageusers',
				icon: <IoIosSettings />,
			},
		],
	},
	{
		key: 'userpermission',
		label: 'User Permission',
		path: '/layout/userpermission',
		icon: <IoKeyOutline />,
		iconClosed: <FaArrowDown/>,
		iconOpened: <FaArrowUp/>,
		subNav: [
			{
				label: 'Add Users',
				path: '/layout/addusers',
				icon: <IoMdAdd />,
			},
			{
				label: 'Manage Users',
				path: '/layout/manageusers',
				icon: <IoIosSettings />,
			},
		],
	},

	{
		key: 'logout',
		label: 'Logout',
		path: '/logout',
		icon: <HiOutlineLogout />
	}
]