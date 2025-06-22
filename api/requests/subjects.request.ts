import { api } from "./api";

export const subjectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addSubject: builder.mutation<
      unknown,
      {
        subjectName: string;
        courseCode: string;
        courseLecturer: string;
        subjectVenue: string;
        creditUnit: string;
        day: string;
        time: string;
      }
    >({
      query: (credentials) => ({
        url: "/(tabs)/add-subject",
        method: "POST",
        body: credentials,
      }),
    //   invalidatesTags: [""],
    }),

    
    viewTimetable: builder.query<unknown, void>({
      query: () => ({
        url: "/(tabs)/subject-list",
        method: "GET",
      }),
    //   invalidatesTags: [""],
    }),

    updateSubject: builder.mutation<unknown, 
    {
      id: string;
        subjectName: string;
        courseCode: string;
        courseLecturer: string;
    }>({
      query: (credentials) => ({
        url: "/(tabs)/subject-list",
        method: "PUT",
        body: credentials,
      }),
    //   invalidatesTags: [""],
    }),

    deleteSubject: builder.mutation<unknown, string>({
      query: () => ({
        url: "/(tabs)/subject-list",
        method: "DELETE",
      }),
    //   invalidatesTags: [""],
    }),
  }),
});

export const {
    useAddSubjectMutation,
    useViewTimetableQuery,
    useUpdateSubjectMutation,
    useDeleteSubjectMutation,
  } = subjectApi;
