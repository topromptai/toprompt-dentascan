/**
 * Canonical MongoDB document shape.
 * All entity interfaces (User, Post, Expense, etc.) MUST extend this.
 * Auto-injected by generate_component_library before the schema phase runs.
 */
export interface BaseMongoDocument {
  _id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/** Any primary key value — always a string in Mongo (_id). */
export type ID = string;

/** Helper for types that carry only createdAt/updatedAt timestamps. */
export type Timestamped<T> = T & Pick<BaseMongoDocument, 'createdAt' | 'updatedAt'>;
