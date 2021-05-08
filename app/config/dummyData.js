import moment from "moment";

//
// USERS
// --> CURRENT
const me = {
	// Default attributes
	id: "usr-100",
	registeredOn: "2021-05-08 02:23:58",
	status: 1,
	phone: "+237656895348",
	type: "student",
	email: "frankkevymbappe@gmail.com",
	classrooms: ["cls-001", "cls-002", "cls-003"],
	lastTimeConnected: "2021-02-17 09:58:13",
	profile: {
		nomination: "",
		firstName: "Frank Kevy",
		lastName: "Mbappe",
		fullName: "Frank MBAPPE",
		birthday: "2001-12-19",
		gender: "male",
		picUrl: "https://picsum.photos/id/1047/300/300",
	},
	pocket: {
		posts: ["pos-110"],
		notes: [],
	},

	// Specific attributes
	faculty: "General nursing",
	school: {
		id: "school-00001",
		name: "Institut Universitaire de la Côte (IUC) - Douala, Logbessou",
	},
	grade: 12,
	reportCard: {},
};
// --> TEACHERS
const teachers = [
	{
		// Default attributes
		id: "usr-210",
		registeredOn: "2021-02-17 17:32:51",
		status: 0,
		phone: "+237656895347",
		type: "teacher",
		email: "samwellkong@gmail.com",
		classrooms: ["cls-001", "cls-002"],
		lastTimeConnected: "2021-02-17 09:58:13",
		profile: {
			nomination: "Dr.",
			firstName: "Samwell",
			lastName: "KONG",
			fullName: "Dr. Samwell KONG",
			birthday: "1985-02-05",
			gender: "male",
			picUrl: "https://picsum.photos/id/1005/300/300",
		},
		pocket: {
			posts: ["pos-110"],
			notes: [],
		},

		// Specific attributes
		// --> As a consultant
		company: "Polyclinique IDIMED - Douala, Bonapriso",
		proPhone: "+237653243512",
		proEmail: "drsamwellkong@idimail.com",
		mainDomain: "domain-00001",
		additDomains: ["domain-00002", "domain-00003"],
		yearsOfExperience: 15,
		// --> As a teacher
		lecturesAt: [
			{
				id: "school-00001",
				name: "Institut Universitaire de la Côte (IUC) - Douala, Logbessou",
			},
			{
				id: "school-00002",
				name: "University of Buea - Buea",
			},
		],
		lectures: [
			"General Nursing Science",
			"Professional Nursing 1",
			"Concepts in Pathophysiology & Pharmacology",
			"Nursing Care of Adults Across the Life Span ",
		],
	},
	{
		// Default attributes
		id: "usr-211",
		registeredOn: "2020-08-11 10:13:28",
		status: 0,
		phone: "+237656895349",
		type: "teacher",
		email: "ewubemarceline@gmail.com",
		classrooms: ["cls-001", "cls-002"],
		lastTimeConnected: "2021-02-17 10:25:02",
		profile: {
			nomination: "Mrs.",
			firstName: "Marceline",
			lastName: "EWUBE",
			fullName: "Mrs. Marceline EWUBE",
			birthday: "1987-03-14",
			gender: "female",
			picUrl: "https://picsum.photos/id/237/300/300",
		},
		pocket: {
			posts: ["pos-111"],
			notes: [],
		},

		// Specific attributes
		// --> As a consultant
		company: "Polyclinique IDIMED - Douala, Bonapriso",
		proPhone: "+237653243513",
		proEmail: "drewubemarceline@idimail.com",
		mainDomain: "domain-00002",
		additDomains: ["domain-00001", "domain-00003"],
		yearsOfExperience: 12,
		// --> As a teacher
		lecturesAt: [
			{
				id: "school-00001",
				name: "Institut Universitaire de la Côte (IUC) - Douala, Logbessou",
			},
			{
				id: "school-00002",
				name: "University of Buea - Buea",
			},
		],
		lectures: [
			"General Nursing Science",
			"Physiotherapy",
			"Health Assessment and Communication",
		],
	},
];
// --> STUDENTS
const students = [
	{
		// Default attributes
		id: "usr-110",
		registeredOn: "2020-11-21 14:30:02",
		status: 0,
		phone: "+237656895354",
		type: "student",
		email: "jojoelmatador27@gmail.com",
		classrooms: ["cls-001", "cls-002", "cls-003"],
		lastTimeConnected: "2021-02-17 09:58:13",
		profile: {
			nomination: "",
			firstName: "Joseph",
			lastName: "KRUMAH",
			fullName: "Joseph KRUMAH",
			birthday: "1999-12-18",
			gender: "male",
			picUrl: "https://picsum.photos/id/1015/300/300",
		},
		pocket: {
			posts: [],
			notes: [],
		},

		// Specific attributes
		faculty: "Critical Care Nurse",
		school: {
			id: "school-00001",
			name: "Institut Universitaire de la Côte (IUC) - Douala, Logbessou",
		},
		grade: 12,
		reportCard: {},
	},
	{
		// Default attributes
		id: "usr-111",
		registeredOn: "2020-11-21 14:30:02",
		status: 0,
		phone: "+237656895354",
		type: "student",
		email: "carolaveli@gmail.com",
		classrooms: ["cls-001", "cls-003"],
		lastTimeConnected: "2021-02-17 09:58:13",
		profile: {
			nomination: "",
			firstName: "Caroline Estelle Manuella",
			lastName: "Mokam Tene",
			fullName: "Caroline Mokam",
			birthday: "1997-04-01",
			gender: "female",
			picUrl: "https://picsum.photos/id/1014/300/300",
		},
		pocket: {
			posts: [],
			notes: [],
		},

		// Specific attributes
		faculty: "Critical Care Nurse",
		school: {
			id: "school-00001",
			name: "Institut Universitaire de la Côte (IUC) - Douala, Logbessou",
		},
		grade: 12,
		reportCard: {},
	},
	{
		// Default attributes
		id: "usr-112",
		registeredOn: "2020-05-08 20:31:07",
		status: 0,
		phone: "+237656895355",
		type: "student",
		email: "clairekbrown@gmail.com",
		classrooms: ["cls-001", "cls-002"],
		lastTimeConnected: "2021-02-17 09:58:13",
		profile: {
			nomination: "",
			firstName: "Claire-Ameline",
			lastName: "Sontchou",
			fullName: "Claire-Ameline SONTCHOU",
			birthday: "1998-06-15",
			gender: "female",
			picUrl: "https://picsum.photos/id/1016/300/300",
		},
		pocket: {
			posts: [],
			notes: [],
		},

		// Specific attributes
		faculty: "Geriatric Nursing",
		school: {
			id: "school-00002",
			name: "University of Buea - Buea",
		},
		grade: 12,
		reportCard: {},
	},
	{
		// Default attributes
		id: "usr-113",
		registeredOn: "2020-01-31 17:22:45",
		status: 0,
		phone: "+237656895356",
		type: "student",
		email: "base10bigmop@gmail.com",
		classrooms: ["cls-001", "cls-002", "cls-003"],
		lastTimeConnected: "2021-02-17 09:58:13",
		profile: {
			nomination: "",
			firstName: "Basile Joël",
			lastName: "Mekontchou",
			fullName: "Joël MEKONTCHOU",
			birthday: "2001-12-14",
			gender: "male",
			picUrl: "https://picsum.photos/id/1025/300/300",
		},
		pocket: {
			posts: [],
			notes: [],
		},

		// Specific attributes
		faculty: "Cardiac Nurse",
		school: {
			id: "school-00002",
			name: "University of Buea - Buea",
		},
		grade: 12,
		reportCard: {},
	},
];
// --> CONSULTANTS
const consultants = [
	{
		// Default attributes
		id: "usr-310",
		registeredOn: "2020-09-09 15:20:37",
		status: 0,
		phone: "+237656895350",
		type: "consultant",
		email: "paulinebea2654@gmail.com",
		classrooms: ["cls-001"],
		lastTimeConnected: "2021-02-17 09:58:13",
		profile: {
			nomination: "Dr.",
			firstName: "Anne Pauline",
			lastName: "Béa",
			fullName: "Dr. Anne Pauline Béa",
			birthday: "1990-02-05",
			gender: "female",
			picUrl: "https://picsum.photos/id/1003/300/300",
		},
		pocket: {
			posts: [],
			notes: [],
		},

		// Specific attributes
		// --> As a consultant
		company: "Fondation Médicale Adlucem - Douala, Bonamoussadi",
		proPhone: "+237653243514",
		proEmail: "drbeannepaul@adlucem.com",
		mainDomain: "domain-00003",
		additDomains: ["domain-00001"],
		yearsOfExperience: 5,
	},
	{
		// Default attributes
		id: "usr-311",
		registeredOn: "2020-01-25 18:21:58",
		status: 0,
		phone: "+237656895351",
		type: "consultant",
		email: "adelechukweze@gmail.com",
		classrooms: ["cls-002"],
		lastTimeConnected: "",
		profile: {
			nomination: "Dr.",
			firstName: "Adele",
			lastName: "Chukweze",
			fullName: "Dr. Adele CHUKWEZE",
			birthday: "1998-01-21",
			gender: "female",
			picUrl: "https://picsum.photos/id/1010/300/300",
		},
		pocket: {
			posts: [],
			notes: [],
		},

		// Specific attributes
		// --> As a consultant
		company: "Fondation Médicale Adlucem - Douala, Bonamoussadi",
		proPhone: "+237653243515",
		proEmail: "dradelechukweze@adlucem.com",
		mainDomain: "domain-00002",
		additDomains: ["domain-00001"],
		yearsOfExperience: 2,
	},
];
// --> ALL
const users = [...teachers, ...students, ...consultants];

//
// CLASSROOMS
const classrooms = [
	{
		id: "cls-001",
		name: "IUC BTECH SWE 3 2020-2021",
		description:
			"This is the official classroom of level 3 Btech software engineering students of IUC.",
		teacher: teachers.find((x) => x.id === "usr-210"),
		students: [...students.filter((x) => "cls-001" in x.classrooms), me],
		consultants: consultants.filter((x) => "cls-001" in x.classrooms),
		postsPerDay: 2.32,
	},
	{
		id: "cls-002",
		name: "Clinical Nurse Specialists - University Of Buea",
		description:
			"This is the official classroom of the clinical nurse specialists of the University of Buea.",
		teacher: teachers.find((x) => x.id === "usr-211"),
		students: [...students.filter((x) => "cls-002" in x.classrooms), me],
		consultants: consultants.filter((x) => "cls-002" in x.classrooms),
		postsPerDay: 1.04,
	},
	{
		id: "cls-003",
		name: "Cardiac Nursing - University Of Buea",
		description:
			"This is the official classroom of the cardiac nurses of the University of Buea.",
		teacher: teachers.find((x) => x.id === "usr-210"),
		students: [...students.filter((x) => "cls-003" in x.classrooms), me],
		consultants: consultants.filter((x) => "cls-003" in x.classrooms),
		postsPerDay: 0.89,
	},
];

//
// POSTS
const posts = [
	// Simple
	{
		id: "pos-110",
		author: users.find((x) => x.id === "usr-210"),
		createdOn: "2020-12-25 11:36:21",
		classroom: "cls-001",
		text:
			"Dear students, repetition is the mother of success. Keep doing what you do on and on until it becomes genuinely natural.",
		likes: [
			{ date: moment().format(), userId: "usr-110" },
			{ date: moment().format(), userId: "usr-111" },
			{ date: moment().format(), userId: "usr-112" },
		],
		comments: [
			{
				date: moment().format(),
				userId: "usr-110",
				text: "Pretty helpful, thanks sir !",
				replies: [
					{
						date: moment().format(),
						userId: "user-210",
						text: "@usr-110 You're welcome my child",
					},
					{
						date: moment().format(),
						userId: "user-110",
						text: "@usr-210 ('^ - ^)",
					},
				],
				likes: [
					{ date: moment().format(), userId: "usr-210" },
					{ date: moment().format(), userId: "usr-112" },
				],
			},
		],
		shares: 12,
		tags: ["inspiration", "motivation", "FakeItTillYouMakeIt"],
	},

	// With photo
	{
		id: "pos-111",
		author: users.find((x) => x.id === "usr-210"),
		createdOn: "2020-12-25 11:36:21",
		classroom: "cls-001",
		text:
			"Dear students, repetition is the mother of success. Keep doing what you do on and on until it becomes genuinely natural.",
		likes: users.map((x) => ({
			date: moment().format(),
			userId: x.id,
		})),
		comments: [
			{
				date: moment().format(),
				userId: "usr-310",
				text: "Tremendous quote here, I must take some notes",
				replies: [
					{
						date: moment().format(),
						userId: "user-210",
						text: "@usr-310 Lol, do so then",
					},
					{
						date: moment().format(),
						userId: "user-310",
						text: "@usr-210 Bet, I will",
					},
					{
						date: moment().format(),
						userId: "user-100",
						text: "@usr-110 I agree, totally",
					},
				],
				likes: [
					{ date: moment().format(), userId: "usr-210" },
					{ date: moment().format(), userId: "usr-112" },
					{ date: moment().format(), userId: "usr-111" },
					{ date: moment().format(), userId: "usr-310" },
				],
			},
		],
		shares: 12,
		file: {
			uri: "https://picsum.photos/id/1029/200/300",
			type: "image",
			size: "148",
			name: "1029",
			extension: "jpg",
		},
		tags: ["inspiration", "motivation", "FakeItTillYouMakeIt"],
	},

	// With video
	{
		id: "pos-112",
		author: users.find((x) => x.id === "usr-210"),
		createdOn: "2020-12-25 11:36:21",
		classroom: "cls-001",
		text:
			"Dear students, repetition is the mother of success. Keep doing what you do on and on until it becomes genuinely natural.",
		likes: users.map((x) => ({
			date: moment().format(),
			userId: x.id,
		})),
		comments: [
			{
				date: moment().format(),
				userId: "usr-310",
				text: "Tremendous quote here, I must take some notes",
				replies: [
					{
						date: moment().format(),
						userId: "user-210",
						text: "@usr-310 Lol, do so then",
					},
					{
						date: moment().format(),
						userId: "user-310",
						text: "@usr-210 Bet, I will",
					},
					{
						date: moment().format(),
						userId: "user-100",
						text: "@usr-110 I agree, totally",
					},
				],
				likes: [
					{ date: moment().format(), userId: "usr-210" },
					{ date: moment().format(), userId: "usr-112" },
					{ date: moment().format(), userId: "usr-111" },
					{ date: moment().format(), userId: "usr-310" },
				],
			},
		],
		shares: 12,
		file: {
			uri:
				"https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_2MB.mp4",
			type: "video",
			size: "2048",
			length: "160",
			name: "Big_Buck_Bunny_360_10s_2MB",
			extension: "mp4",
		},
		tags: ["inspiration", "motivation", "FakeItTillYouMakeIt"],
	},
];

export { teachers, students, consultants, users, classrooms, posts };
