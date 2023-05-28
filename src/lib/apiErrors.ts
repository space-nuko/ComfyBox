import type { NodeID } from "@litegraph-ts/core"
import type { ComfyNodeDefInput } from "./ComfyNodeDef"
import type { ComfyNodeID, PromptID } from "./api"
import type { SerializedPromptInputLink } from "./components/ComfyApp"
import type { WorkflowError, WorkflowInstID } from "./stores/workflowState"
import { exclude_internal_props } from "svelte/internal"
import type ComfyGraphCanvas from "./ComfyGraphCanvas"
import type { QueueEntry } from "./stores/queueState"

enum ComfyPromptErrorType {
    NoOutputs = "prompt_no_outputs",
    OutputsFailedValidation = "prompt_outputs_failed_validation",
}

export interface ComfyPromptError<T = any> {
    type: ComfyPromptErrorType,
    message: string,
    details: string,
    extra_info: T
}

export interface CPENoOutputs extends ComfyPromptError {
    type: ComfyPromptErrorType.NoOutputs
}

export interface CPEOutputsFailedValidation extends ComfyPromptError {
    type: ComfyPromptErrorType.OutputsFailedValidation
}

export enum ComfyNodeErrorType {
    RequiredInputMissing = "required_input_missing",
    BadLinkedInput = "bad_linked_input",
    ReturnTypeMismatch = "return_type_mismatch",
    InvalidInputType = "invalid_input_type",
    ValueSmallerThanMin = "value_smaller_than_min",
    ValueBiggerThanMax = "value_bigger_than_max",
    CustomValidationFailed = "custom_validation_failed",
    ValueNotInList = "value_not_in_list",
    ExceptionDuringValidation = "exception_during_validation",
    ExceptionDuringInnerValidation = "exception_during_inner_validation",
}

export interface ComfyNodeError<T = any> {
    type: ComfyNodeErrorType,
    message: string,
    details: string,
    extra_info: T
}

export type ComfyNodeErrors = {
    errors: ComfyNodeError[],
    dependent_outputs: ComfyNodeID[],
    class_type: string
}

export type InputWithValue = {
    input_name: string,
    input_config: ComfyNodeDefInput,
    received_value: any
}

function isInputWithValue(param: any): param is InputWithValue {
    return param && "input_name" in param;
}

export type InputWithValueAndException = InputWithValue & {
    exception_message: string
}

export type InputWithLinkedNode = {
    input_name: string,
    input_config: ComfyNodeDefInput,
    linked_node: SerializedPromptInputLink
}

export type ValidationException = {
    exception_type: string,
    traceback: string[]
}

function isValidationException(param: any): param is ValidationException {
    return param && "exception_type" in param && "traceback" in param;
}

export interface CNERequiredInputMissing extends ComfyNodeError<{ input_name: string }> {
    type: ComfyNodeErrorType.RequiredInputMissing
}

export interface CNEBadLinkedInput extends ComfyNodeError<InputWithValue> {
    type: ComfyNodeErrorType.BadLinkedInput
}

export interface CNEReturnTypeMismatch extends ComfyNodeError<InputWithLinkedNode & { received_type: string }> {
    type: ComfyNodeErrorType.ReturnTypeMismatch
}

export interface CNEInvalidInputType extends ComfyNodeError<InputWithValue & { exception_message: string }> {
    type: ComfyNodeErrorType.InvalidInputType
}

export interface CNEValueSmallerThanMin extends ComfyNodeError<InputWithValue> {
    type: ComfyNodeErrorType.ValueSmallerThanMin
}

export interface CNEValueBiggerThanMax extends ComfyNodeError<InputWithValue> {
    type: ComfyNodeErrorType.ValueBiggerThanMax
}

export interface CNECustomValidationFailed extends ComfyNodeError<InputWithValue> {
    type: ComfyNodeErrorType.CustomValidationFailed
}

export interface CNEValueNotInList extends ComfyNodeError<InputWithValue> {
    type: ComfyNodeErrorType.ValueNotInList
}

export interface CNEExceptionDuringValidation extends ComfyNodeError<ValidationException> {
    type: ComfyNodeErrorType.ExceptionDuringValidation
}

export interface CNEExceptionDuringInnerValidation extends ComfyNodeError<InputWithLinkedNode & ValidationException> {
    type: ComfyNodeErrorType.ExceptionDuringInnerValidation
}

export type ComfyAPIPromptErrorResponse = {
    error: ComfyPromptError,
    node_errors: Record<ComfyNodeID, ComfyNodeErrors>,
}

export type ComfyInterruptedError = {
    prompt_id: PromptID,
    node_id: ComfyNodeID,
    node_type: string,
    executed: ComfyNodeID[]
}

export type ComfyExecutionError = ComfyInterruptedError & {
    exception_message: string,
    exception_type: string,
    traceback: string[],
    current_inputs: any[],
    current_outputs: any[][],
}

export function formatValidationError(error: ComfyAPIPromptErrorResponse) {
    return `${error.error.message}: ${error.error.details}`
}

export function formatExecutionError(error: ComfyExecutionError) {
    return error.exception_message
}

export type ComfyGraphErrorInput = {
    name: string,
    config?: ComfyNodeDefInput,

    receivedValue?: any,
    receivedType?: string,
    linkedNode?: SerializedPromptInputLink
}

export type ComfyGraphErrorLocation = {
    workflowID: WorkflowInstID,
    nodeID: NodeID,
    comfyNodeType: string,
    errorType: ComfyNodeErrorType | "execution",
    message: string,
    dependentOutputs: NodeID[],
    queueEntry: QueueEntry,

    input?: ComfyGraphErrorInput,

    exceptionMessage?: string,
    exceptionType?: string,
    traceback?: string[],

    inputValues?: any[],
    outputValues?: any[][],
}

export type ComfyGraphErrors = {
    message: string,
    errors: ComfyGraphErrorLocation[],
    errorsByID: Record<NodeID, ComfyGraphErrorLocation[]>
}

export function validationErrorToGraphErrors(workflowID: WorkflowInstID, validationError: ComfyAPIPromptErrorResponse, queueEntry: QueueEntry): ComfyGraphErrors {
    const errorsByID: Record<NodeID, ComfyGraphErrorLocation[]> = {}

    for (const [nodeID, nodeErrors] of Object.entries(validationError.node_errors)) {
        errorsByID[nodeID] = nodeErrors.errors.map(e => {
            const loc: ComfyGraphErrorLocation = {
                workflowID,
                nodeID,
                comfyNodeType: nodeErrors.class_type,
                errorType: e.type,
                message: e.message,
                dependentOutputs: nodeErrors.dependent_outputs,
                queueEntry
            }

            if (isInputWithValue(e.extra_info)) {
                loc.input = {
                    name: e.extra_info.input_name,
                    config: e.extra_info.input_config,
                    receivedValue: e.extra_info.received_value
                }

                if ("received_type" in e.extra_info) {
                    loc.input.receivedType = e.extra_info.received_type as string;
                }
                if ("linked_node" in e.extra_info) {
                    loc.input.linkedNode = e.extra_info.linked_node as SerializedPromptInputLink;
                }
            }

            if ("exception_message" in e.extra_info) {
                loc.exceptionMessage = e.extra_info.exception_message as "string"
            }

            if (isValidationException(e.extra_info)) {
                loc.exceptionType = e.extra_info.exception_type;
                loc.traceback = e.extra_info.traceback;
            }

            return loc;
        })
    }

    return {
        message: validationError.error.message,
        errors: Object.values(errorsByID).flatMap(e => e),
        errorsByID
    }
}

export function executionErrorToGraphErrors(workflowID: WorkflowInstID, executionError: ComfyExecutionError, queueEntry: QueueEntry): ComfyGraphErrors {
    const errorsByID: Record<NodeID, ComfyGraphErrorLocation[]> = {}

    errorsByID[executionError.node_id] = [{
        workflowID,
        nodeID: executionError.node_id,
        comfyNodeType: executionError.node_type,
        errorType: "execution",
        message: executionError.exception_message,
        dependentOutputs: [], // TODO
        queueEntry,

        exceptionMessage: executionError.exception_message,
        exceptionType: executionError.exception_type,
        traceback: executionError.traceback,
        inputValues: executionError.current_inputs,
        outputValues: executionError.current_outputs,
    }]

    return {
        message: executionError.exception_message,
        errors: Object.values(errorsByID).flatMap(e => e),
        errorsByID
    }
}

export function workflowErrorToGraphErrors(workflowID: WorkflowInstID, workflowError: WorkflowError, queueEntry: QueueEntry): ComfyGraphErrors {
    if (workflowError.type === "validation") {
        return validationErrorToGraphErrors(workflowID, workflowError.error, queueEntry)
    }
    else {
        return executionErrorToGraphErrors(workflowID, workflowError.error, queueEntry)
    }
}
