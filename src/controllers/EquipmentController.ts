import type {
	Equipment,
	EquipmentModel,
	EquipmentPositionHistory,
	EquipmentState,
	EquipmentStateHistory,
} from "../models/EquipmentModel";
import { EquipmentService } from "../services/EquipmentService";

export class EquipmentController {
	private constructor(private readonly equipmentService: EquipmentService) {}

	private static instance: EquipmentController;
	private equipments: Array<Equipment> = [];
	private equipmentModels: Array<EquipmentModel> = [];
	private equipmentStates: Array<EquipmentState> = [];
	private equipmentStateHistory: Array<EquipmentStateHistory> = [];
	private equipmentPositionHistory: Array<EquipmentPositionHistory> = [];

	public static getInstance(): EquipmentController {
		if (!EquipmentController.instance) {
			EquipmentController.instance = new EquipmentController(
				new EquipmentService(),
			);
		}
		return EquipmentController.instance;
	}

	async initialize() {
		try {
			[
				this.equipments,
				this.equipmentModels,
				this.equipmentStates,
				this.equipmentStateHistory,
				this.equipmentPositionHistory,
			] = await Promise.all([
				this.equipmentService.getEquipments(),
				this.equipmentService.getEquipmentModels(),
				this.equipmentService.getEquipmentStates(),
				this.equipmentService.getEquipmentStateHistory(),
				this.equipmentService.getEquipmentPositionHistory(),
			]);
		} catch (error) {
			console.error("Error initializing equipment data:", error);
		}
	}

	getEquipments(): Equipment[] {
		return this.equipments;
	}

	getEquipmentById(id: string): Equipment | undefined {
		return this.equipments.find((equipment) => equipment.id === id);
	}

	getEquipmentModelById(id: string): EquipmentModel | undefined {
		return this.equipmentModels.find((model) => model.id === id);
	}

	getEquipmentStateById(id: string): EquipmentState | undefined {
		return this.equipmentStates.find((state) => state.id === id);
	}

	getEquipmentStateHistory(
		equipmentId: string,
	): EquipmentStateHistory | undefined {
		return this.equipmentStateHistory.find(
			(history) => history.equipmentId === equipmentId,
		);
	}

	getEquipmentPositionHistory(
		equipmentId: string,
	): EquipmentPositionHistory | undefined {
		return this.equipmentPositionHistory.find(
			(history) => history.equipmentId === equipmentId,
		);
	}
}
