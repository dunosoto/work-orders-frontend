export abstract class HttpClientService {

  public abstract contextPath(): string;

  public abstract path(): string;

  public getUrl(): string {
    return `${this.contextPath()}${this.path()}`;
  }
}
