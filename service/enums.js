export const ReportEnum = {
  User: 0,
  Product: 1,
  Community: 2,
  CommunityPost: 3,
  CommunityPostComment: 4,
};

export const CommunityRole = {
  Member: 0,
  Admin: 1,
  Owner: 2,
};

export const communityRoleString = (num) => {
  switch (num) {
    case 0:
      return "Member";
    case 1:
      return "Admin";
    case 2:
      return "Owner";
  }
};

export const ReportStatus = {
  Active: 0,
  Done: 1,
};

export const ValidIdType = ["Passport", "NBI", "Police Clearance"];

export const OtherTransactionType = {
  Topup: 0,
  Boost: 1,
  Subscribe: 2,
  Refund: 3,
};
