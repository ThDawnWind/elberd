export type AppErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "REF_EXPIRED"
  | "PAYLOAD_TOO_LARGE"
  | "URI_TOO_LONG"
  | "UNPROCESSABLE"
  | "RATE_LIMITED"
  | "INTERNAL"
  | "TIMEOUT"
  | "CONNECTION_CLOSED"
  | "UNKNOWN";

export class ProductsServiceError extends Error {
  code: AppErrorCode;
  status?: number;
  retryable: boolean;
  userMessage: string;
  details?: string;
  cause?: unknown;

  constructor(params: {
    message: string;
    code: AppErrorCode;
    userMessage: string;
    retryable?: boolean;
    status?: number;
    details?: string;
    cause?: unknown;
  }) {
    super(params.message);
    this.name = "ProductsServiceError";
    this.code = params.code;
    this.status = params.status;
    this.retryable = params.retryable ?? false;
    this.userMessage = params.userMessage;
    this.details = params.details;
    this.cause = params.cause;
  }
}

function getErrorStatus(error: unknown): number | undefined {
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as { status?: unknown }).status === "number"
  ) {
    return (error as { status: number }).status;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object" &&
    (error as { response?: { status?: unknown } }).response &&
    typeof (error as { response: { status?: unknown } }).response.status ===
      "number"
  ) {
    return (error as { response: { status: number } }).response.status;
  }

  return undefined;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unknown error";
}

export function normalizePrismicError(
  error: unknown,
  fallbackMessage: string
): ProductsServiceError {
  const status = getErrorStatus(error);
  const message = getErrorMessage(error).toLowerCase();

  if (status === 400) {
    return new ProductsServiceError({
      message: fallbackMessage,
      code: "BAD_REQUEST",
      status,
      retryable: false,
      userMessage: "Не удалось обработать запрос. Проверьте фильтры или параметры.",
      details: "Prismic returned 400 Bad Request",
      cause: error,
    });
  }

  if (status === 401) {
    return new ProductsServiceError({
      message: fallbackMessage,
      code: "UNAUTHORIZED",
      status,
      retryable: false,
      userMessage: "Ошибка доступа к контенту. Проверьте access token Prismic.",
      details: "Prismic returned 401 Unauthorized",
      cause: error,
    });
  }

  if (status === 403) {
    return new ProductsServiceError({
      message: fallbackMessage,
      code: "FORBIDDEN",
      status,
      retryable: false,
      userMessage: "Доступ к данным запрещён. Проверьте настройки API.",
      details: "Prismic returned 403 Forbidden",
      cause: error,
    });
  }

  if (status === 404) {
    return new ProductsServiceError({
      message: fallbackMessage,
      code: "NOT_FOUND",
      status,
      retryable: false,
      userMessage: "Запрашиваемый контент не найден.",
      details: "Prismic returned 404 Not Found",
      cause: error,
    });
  }

  if (status === 410) {
    return new ProductsServiceError({
      message: fallbackMessage,
      code: "REF_EXPIRED",
      status,
      retryable: true,
      userMessage: "Данные устарели. Обновите страницу и попробуйте снова.",
      details: "Prismic returned 410 Gone / ref expired",
      cause: error,
    });
  }

  if (status === 413) {
    return new ProductsServiceError({
      message: fallbackMessage,
      code: "PAYLOAD_TOO_LARGE",
      status,
      retryable: false,
      userMessage: "Слишком большой объём данных для одного запроса.",
      details: "Prismic returned 413 Content Too Large",
      cause: error,
    });
  }

  if (status === 414) {
    return new ProductsServiceError({
      message: fallbackMessage,
      code: "URI_TOO_LONG",
      status,
      retryable: false,
      userMessage: "Слишком длинный запрос. Упростите фильтры.",
      details: "Prismic returned 414 URI Too Long",
      cause: error,
    });
  }

  if (status === 422) {
    return new ProductsServiceError({
      message: fallbackMessage,
      code: "UNPROCESSABLE",
      status,
      retryable: false,
      userMessage: "Сервер не смог обработать запрос. Попробуйте сузить выборку.",
      details: "Prismic returned 422 Unprocessable Content",
      cause: error,
    });
  }

  if (status === 429) {
    return new ProductsServiceError({
      message: fallbackMessage,
      code: "RATE_LIMITED",
      status,
      retryable: true,
      userMessage: "Слишком много запросов. Повторите через несколько секунд.",
      details: "Prismic returned 429 Too Many Requests",
      cause: error,
    });
  }

  if (status === 500) {
    return new ProductsServiceError({
      message: fallbackMessage,
      code: "INTERNAL",
      status,
      retryable: true,
      userMessage: "Временная ошибка сервиса. Попробуйте позже.",
      details: "Prismic returned 500 Internal Error",
      cause: error,
    });
  }

  if (status === 504) {
    return new ProductsServiceError({
      message: fallbackMessage,
      code: "TIMEOUT",
      status,
      retryable: true,
      userMessage: "Сервис слишком долго отвечает. Попробуйте снова.",
      details: "Prismic returned 504 Gateway Timeout",
      cause: error,
    });
  }

  if (
    message.includes("000") ||
    message.includes("network") ||
    message.includes("fetch")
  ) {
    return new ProductsServiceError({
      message: fallbackMessage,
      code: "CONNECTION_CLOSED",
      retryable: true,
      userMessage: "Соединение было прервано. Проверьте сеть и попробуйте снова.",
      details: "Connection closed or network error",
      cause: error,
    });
  }

  return new ProductsServiceError({
    message: fallbackMessage,
    code: "UNKNOWN",
    retryable: false,
    userMessage: "Не удалось загрузить данные. Попробуйте позже.",
    details: getErrorMessage(error),
    cause: error,
  });
}