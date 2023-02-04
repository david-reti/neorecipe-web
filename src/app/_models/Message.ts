export default interface Message {
    messageType: 'info' | 'warning' | 'error' | 'success';
    content: String;
    type: 'login' | 'books' | null;
    longVersion: String;
}