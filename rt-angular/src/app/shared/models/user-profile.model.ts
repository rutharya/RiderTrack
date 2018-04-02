export interface UserProfile {
  email: string;
  username: string;
  // TODO: add support for images.
  // image: string;
  // true or false (if user1(page-viewer) is following user2)
  following: boolean;
}
