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
        url: "/subject/add-subject",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Subject"],
    }),

    viewTimetable: builder.query<unknown, void>({
      query: () => ({
        url: "/subject/subject-list",
        method: "GET",
      }),
      //   invalidatesTags: [""],
      providesTags: ["Subject"],
    }),

    updateSubject: builder.mutation<
      unknown,
      {
        id: string;
        subjectName: string;
        courseCode: string;
        courseLecturer: string;
      }
    >({
      query: (credentials) => ({
        url: "/subject/edit-subject",
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Subject"],
    }),

    deleteSubject: builder.mutation<unknown, string>({
      query: () => ({
        url: "/(tabs)/subject-list",
        method: "DELETE",
      }),
      invalidatesTags: ["Subject"],
    }),
  }),
});

export const {
  useAddSubjectMutation,
  useViewTimetableQuery,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectApi;
