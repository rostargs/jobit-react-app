// Firebase
import { QueryConstraint, WhereFilterOp, where } from "firebase/firestore";

type TDefaultObject = Record<string, unknown>;

type TCreateFilterFromUserData<T extends TDefaultObject> = {
    [K in keyof T]?: T[K];
};

export const createFiltersQuery = <T extends TDefaultObject, U = TDefaultObject>(
    queries: TCreateFilterFromUserData<T>,
    path?: keyof U,
    op: WhereFilterOp = "=="
): QueryConstraint[] => {
    return Object.keys(queries).map(
        (query) =>
            queries[query as keyof T] && where(path ? `${String(path)}.${query}` : query, op, queries[query as keyof T])
    );
};
