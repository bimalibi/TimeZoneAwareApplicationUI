// import { type UseQueryResult, useQuery } from "react-query";

// const useGetAllUsers = (
//   handleRequest: <T>(request: Promise<T>) => Promise<T | undefined>,
//   tableInfo: TableParamsType
// ): any=> {
//   const {
//     sortOrder,
//     searchKeyword,
//     sorting,
//     roleId,
//     skipCount,
//     maxResultCount,
//   } = tableInfo;
//   const getAllUsers = useQuery(
//     [
//       "getAllUser",
//       sortOrder,
//       searchKeyword,
//       roleId,
//       sorting,
//       skipCount,
//       maxResultCount,
//     ],

//     async () => {
//       return await handleRequest(
//         UserManagementService.getCoreApiApiAppUserManagementPagedAndSortedUserList(
//           sortOrder,
//           searchKeyword,
//           roleId,
//           sorting,
//           skipCount,
//           maxResultCount
//         )
//       );
//     }
//   );
//   return getAllUsers;
// };

// export default useGetAllUsers;
