export default interface Message {
    messageType: 'info' | 'warning' | 'error';
    content: String;
    type: 'login' | 'books' | null;
    longVersion: String;
}