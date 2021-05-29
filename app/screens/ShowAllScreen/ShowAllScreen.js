import React, { useState, useEffect } from "react";
import { FlatList, Image } from "react-native";

import ButtonIcon from "../../components/ButtonIcon";
import { ListItemSeparator } from "../../components/lists";
import Screen from "../../components/Screen";
import TextIcon from "../../components/TextIcon";
import NettText from "../../components/Text";
import TopBar from "../../components/TopBar";

import styles from "./styles";
import images from "../../config/images";

function ShowAllScreen({ icon, items, renderItem, title }) {
	const [itemList, setItemList] = useState(items);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		setItemList(items);
	}, [items]);

	return (
		<Screen>
			<TopBar style={styles.topBar}>
				<ButtonIcon name="arrow-left" size={25} />
				<TextIcon
					containerStyle={styles.titleContainer}
					icon={icon}
					text={title}
					fontSize={20}
					style={styles.title}
				/>
			</TopBar>
			<FlatList
				style={{ flex: 1 }}
				data={itemList}
				showsVerticalScrollIndicator={false}
				keyExtractor={(_, index) => String(index)}
				renderItem={({ item }) => renderItem(item)}
				refreshing={refreshing}
				onRefresh={() => setItemList(items)}
				ListEmptyComponent={
					<Image
						source={images.EMPTY_LIST}
						style={{ width: 150, height: 150 }}
					/>
				} //* Here
				ItemSeparatorComponent={ListItemSeparator}
			/>
		</Screen>
	);
}

export default ShowAllScreen;
