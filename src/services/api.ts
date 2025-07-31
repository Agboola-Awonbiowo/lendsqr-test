import { DashboardStats, User } from "../types";

// Generate 500 mock users
const generateMockUsers = (): User[] => {
  const organizations = [
    "Lendsqr",
    "Irorun",
    "Lendstar",
    "Lendstack",
    "Lendflow",
  ];
  const statuses: User["status"][] = [
    "Active",
    "Inactive",
    "Pending",
    "Blacklisted",
  ];
  const genders = ["Male", "Female"];
  const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
  const educationLevels = ["B.Sc", "M.Sc", "Ph.D", "HND", "OND"];
  const employmentSectors = [
    "FinTech",
    "Healthcare",
    "Education",
    "Technology",
    "Finance",
  ];
  const residenceTypes = [
    "Own Apartment",
    "Parent's Apartment",
    "Rented",
    "Own House",
  ];
  const banks = [
    "Providus Bank",
    "Access Bank",
    "GT Bank",
    "Zenith Bank",
    "First Bank",
  ];

  const users: User[] = [];

  for (let i = 1; i <= 500; i++) {
    const firstName = `User${i}`;
    const lastName = `Last${i}`;
    const fullName = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}@${organizations[
      Math.floor(Math.random() * organizations.length)
    ].toLowerCase()}.com`;

    const user: User = {
      id: `LSQFf${Math.random().toString(36).substr(2, 8)}`,
      organization:
        organizations[Math.floor(Math.random() * organizations.length)],
      username: fullName,
      email,
      phoneNumber: `080${Math.floor(Math.random() * 90000000) + 10000000}`,
      dateJoined: new Date(
        2020,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      fullName,
      bvn: `070${Math.floor(Math.random() * 90000000) + 10000000}`,
      gender: genders[Math.floor(Math.random() * genders.length)],
      maritalStatus:
        maritalStatuses[Math.floor(Math.random() * maritalStatuses.length)],
      children:
        Math.random() > 0.5 ? "None" : `${Math.floor(Math.random() * 4) + 1}`,
      typeOfResidence:
        residenceTypes[Math.floor(Math.random() * residenceTypes.length)],
      levelOfEducation:
        educationLevels[Math.floor(Math.random() * educationLevels.length)],
      employmentStatus: "Employed",
      sectorOfEmployment:
        employmentSectors[Math.floor(Math.random() * employmentSectors.length)],
      durationOfEmployment: `${Math.floor(Math.random() * 10) + 1} years`,
      officeEmail: email,
      monthlyIncome: `₦${(
        Math.floor(Math.random() * 900000) + 100000
      ).toLocaleString()}.00 - ₦${(
        Math.floor(Math.random() * 900000) + 100000
      ).toLocaleString()}.00`,
      loanRepayment: `${(
        Math.floor(Math.random() * 100000) + 10000
      ).toLocaleString()}`,
      twitter: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      facebook: fullName,
      instagram: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      guarantors: [
        {
          fullName: `Guarantor ${i}`,
          phoneNumber: `081${Math.floor(Math.random() * 90000000) + 10000000}`,
          emailAddress: `guarantor${i}@email.com`,
          relationship: Math.random() > 0.5 ? "Sister" : "Brother",
        },
      ],
      tier: Math.floor(Math.random() * 3) + 1,
      accountBalance: `₦${(
        Math.floor(Math.random() * 1000000) + 50000
      ).toLocaleString()}.00`,
      accountNumber: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      bank: banks[Math.floor(Math.random() * banks.length)],
    };

    users.push(user);
  }

  return users;
};

// Store users in localStorage for persistence
const getStoredUsers = (): User[] => {
  const stored = localStorage.getItem("lendsqr_users");
  if (stored) {
    return JSON.parse(stored);
  }
  const users = generateMockUsers();
  localStorage.setItem("lendsqr_users", JSON.stringify(users));
  return users;
};

export const api = {
  // Get all users with optional filtering
  getUsers: (filters?: Partial<User>): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let users = getStoredUsers();

        if (filters) {
          users = users.filter((user) => {
            return Object.entries(filters).every(([key, value]: [string, any]) => {
              if (!value) return true;
              const userValue = user[key as keyof User];
              if (typeof userValue === "string" && typeof value === "string") {
                return userValue.toLowerCase().includes(value.toLowerCase());
              }
              return userValue === value;
            });
          });
        }

        resolve(users);
      }, 500); // Simulate API delay
    });
  },

  // Get user by ID
  getUserById: (id: string): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getStoredUsers();
        const user = users.find((u) => u.id === id) || null;
        resolve(user);
      }, 300);
    });
  },

  // Get dashboard stats
  getDashboardStats: (): Promise<DashboardStats> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getStoredUsers();
        const stats: DashboardStats = {
          users: users.length,
          activeUsers: users.filter((u) => u.status === "Active").length,
          usersWithLoans: Math.floor(users.length * 0.8), // Mock data
          usersWithSavings: Math.floor(users.length * 0.9), // Mock data
        };
        resolve(stats);
      }, 200);
    });
  },

  // Update user status
  updateUserStatus: (
    userId: string,
    status: User["status"]
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getStoredUsers();
        const userIndex = users.findIndex((u) => u.id === userId);
        if (userIndex !== -1) {
          users[userIndex].status = status;
          localStorage.setItem("lendsqr_users", JSON.stringify(users));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);
    });
  },
};
